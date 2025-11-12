import { supabase } from "@/integrations/supabase/client";

export const insertSampleData = async () => {
  try {
    // Check if sample data already exists
    const { data: existingOrgs } = await supabase
      .from('organizations')
      .select('id')
      .limit(1);

    if (existingOrgs && existingOrgs.length > 0) {
      console.log('Sample data already exists');
      return existingOrgs[0].id;
    }

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.log('No user logged in, cannot create sample data');
      return null;
    }

    // Create organization
    const { data: org, error: orgError } = await supabase
      .from('organizations')
      .insert({
        name: 'Demo Organization',
        owner_id: user.id
      })
      .select()
      .single();

    if (orgError) throw orgError;

    // Add user as organization member
    await supabase
      .from('organization_members')
      .insert({
        organization_id: org.id,
        user_id: user.id,
        role: 'owner'
      });

    // Get emission sources
    const { data: sources } = await supabase
      .from('emission_sources')
      .select('*');

    if (!sources) return org.id;

    // Generate sample emissions data for the past 6 months
    const emissionsToInsert = [];
    const today = new Date();
    
    for (let monthOffset = 5; monthOffset >= 0; monthOffset--) {
      const date = new Date(today.getFullYear(), today.getMonth() - monthOffset, 15);
      
      // Add 3-5 random emissions per month
      const numEmissions = Math.floor(Math.random() * 3) + 3;
      
      for (let i = 0; i < numEmissions; i++) {
        const source = sources[Math.floor(Math.random() * sources.length)];
        const amount = Math.random() * 1000 + 100; // Random amount between 100-1100
        const emissionKgCo2 = amount * Number(source.emission_factor);
        
        emissionsToInsert.push({
          organization_id: org.id,
          source_id: source.id,
          user_id: user.id,
          amount: parseFloat(amount.toFixed(2)),
          emission_kg_co2: parseFloat(emissionKgCo2.toFixed(2)),
          recorded_date: date.toISOString().split('T')[0],
          notes: 'Sample data for demonstration'
        });
      }
    }

    // Insert emissions data
    const { error: emissionsError } = await supabase
      .from('emissions_data')
      .insert(emissionsToInsert);

    if (emissionsError) throw emissionsError;

    console.log('Sample data created successfully');
    return org.id;
    
  } catch (error) {
    console.error('Error creating sample data:', error);
    return null;
  }
};

-- Create app role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user', 'org_admin');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create organizations table
CREATE TABLE public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- Create organization_members table
CREATE TABLE public.organization_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role TEXT DEFAULT 'member',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (organization_id, user_id)
);

ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;

-- Create emission_sources table
CREATE TABLE public.emission_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  unit TEXT NOT NULL,
  emission_factor DECIMAL(10, 4) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.emission_sources ENABLE ROW LEVEL SECURITY;

-- Create emissions_data table
CREATE TABLE public.emissions_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  source_id UUID REFERENCES public.emission_sources(id) ON DELETE RESTRICT NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  emission_kg_co2 DECIMAL(12, 2) NOT NULL,
  recorded_date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.emissions_data ENABLE ROW LEVEL SECURITY;

-- Create carbon_offsets table
CREATE TABLE public.carbon_offsets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  project_name TEXT NOT NULL,
  amount_kg_co2 DECIMAL(12, 2) NOT NULL,
  cost DECIMAL(10, 2),
  purchase_date DATE NOT NULL,
  certificate_url TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.carbon_offsets ENABLE ROW LEVEL SECURITY;

-- Create reports table
CREATE TABLE public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  generated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  report_type TEXT NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  data JSONB,
  file_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Create alerts table
CREATE TABLE public.alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  severity TEXT DEFAULT 'info',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

-- Create actions table
CREATE TABLE public.actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  impact_kg_co2 DECIMAL(12, 2),
  due_date DATE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.actions ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  
  -- Assign default user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Create triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_organizations_updated_at
  BEFORE UPDATE ON public.organizations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_emissions_data_updated_at
  BEFORE UPDATE ON public.emissions_data
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_actions_updated_at
  BEFORE UPDATE ON public.actions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for organizations
CREATE POLICY "Users can view their organizations"
  ON public.organizations FOR SELECT
  TO authenticated
  USING (
    owner_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.organization_members
      WHERE organization_id = id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create organizations"
  ON public.organizations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update their organizations"
  ON public.organizations FOR UPDATE
  TO authenticated
  USING (owner_id = auth.uid());

CREATE POLICY "Owners can delete their organizations"
  ON public.organizations FOR DELETE
  TO authenticated
  USING (owner_id = auth.uid());

-- RLS Policies for organization_members
CREATE POLICY "Members can view their membership"
  ON public.organization_members FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.organizations
      WHERE id = organization_id AND owner_id = auth.uid()
    )
  );

CREATE POLICY "Owners can manage members"
  ON public.organization_members FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.organizations
      WHERE id = organization_id AND owner_id = auth.uid()
    )
  );

-- RLS Policies for emission_sources
CREATE POLICY "Anyone can view emission sources"
  ON public.emission_sources FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage emission sources"
  ON public.emission_sources FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for emissions_data
CREATE POLICY "Users can view org emissions"
  ON public.emissions_data FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.organization_members
      WHERE organization_id = emissions_data.organization_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create emissions for their org"
  ON public.emissions_data FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM public.organization_members
      WHERE organization_id = emissions_data.organization_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own emissions"
  ON public.emissions_data FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own emissions"
  ON public.emissions_data FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- RLS Policies for carbon_offsets
CREATE POLICY "Users can view org offsets"
  ON public.carbon_offsets FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.organization_members
      WHERE organization_id = carbon_offsets.organization_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create offsets for their org"
  ON public.carbon_offsets FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.organization_members
      WHERE organization_id = carbon_offsets.organization_id
      AND user_id = auth.uid()
    )
  );

-- RLS Policies for reports
CREATE POLICY "Users can view org reports"
  ON public.reports FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.organization_members
      WHERE organization_id = reports.organization_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create reports for their org"
  ON public.reports FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = generated_by AND
    EXISTS (
      SELECT 1 FROM public.organization_members
      WHERE organization_id = reports.organization_id
      AND user_id = auth.uid()
    )
  );

-- RLS Policies for alerts
CREATE POLICY "Users can view org alerts or own alerts"
  ON public.alerts FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    (user_id IS NULL AND EXISTS (
      SELECT 1 FROM public.organization_members
      WHERE organization_id = alerts.organization_id
      AND user_id = auth.uid()
    ))
  );

CREATE POLICY "Users can update own alerts"
  ON public.alerts FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- RLS Policies for actions
CREATE POLICY "Users can view org actions"
  ON public.actions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.organization_members
      WHERE organization_id = actions.organization_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create actions for their org"
  ON public.actions FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM public.organization_members
      WHERE organization_id = actions.organization_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own actions"
  ON public.actions FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own actions"
  ON public.actions FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Insert default emission sources
INSERT INTO public.emission_sources (name, category, unit, emission_factor, description) VALUES
  ('Electricity', 'Energy', 'kWh', 0.4532, 'Grid electricity consumption'),
  ('Natural Gas', 'Energy', 'm³', 1.9650, 'Natural gas heating'),
  ('Diesel', 'Transport', 'L', 2.6800, 'Diesel fuel'),
  ('Gasoline', 'Transport', 'L', 2.3100, 'Gasoline fuel'),
  ('Air Travel - Domestic', 'Transport', 'km', 0.1550, 'Domestic flights'),
  ('Air Travel - International', 'Transport', 'km', 0.1950, 'International flights'),
  ('Rail Travel', 'Transport', 'km', 0.0410, 'Train travel'),
  ('Car Travel', 'Transport', 'km', 0.1710, 'Average car travel'),
  ('Waste - Landfill', 'Waste', 'kg', 0.5700, 'Waste sent to landfill'),
  ('Paper', 'Materials', 'kg', 0.9000, 'Paper products'),
  ('Plastic', 'Materials', 'kg', 6.0000, 'Plastic products');
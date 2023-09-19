import {createClient} from '@supabase/supabase-js'
// import {CardType} from "@supabase/supabase-js/src/lib/types";
import {CardType} from "type/types";

// const REACT_APP_SUPABASE_APP_FETCH = process.env.REACT_APP_SUPABASE_APP_FETCH


// Create a single supabase client for interacting with your database
export const supabase = createClient<CardType>('https://fngtymhvykcbnvsziogq.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuZ3R5bWh2eWtjYm52c3ppb2dxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIyMDk0OTksImV4cCI6MjAwNzc4NTQ5OX0.P18pLgGrT5pv8Fhy3PlpRt4RhCqSm6PbsHTVA6sb-aM')


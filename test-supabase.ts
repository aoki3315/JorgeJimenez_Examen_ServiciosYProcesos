import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log("Fetching a product...");
  const { data: products } = await supabase.from('products').select('*').limit(1);
  if (!products || products.length === 0) {
    console.log("No products found.");
    return;
  }
  
  const product = products[0];
  console.log(`Original price for ${product.name}: ${product.price}`);
  
  console.log("Updating price...");
  const { data, error } = await supabase
    .from("products")
    .update({ price: (product.price || 0) + 1 })
    .eq("id", product.id)
    .select();
    
  console.log("Update result:", JSON.stringify({ data, error }, null, 2));

  if (error) {
     console.error("Update failed:", error);
  } else if (!data || data.length === 0) {
     console.error("Update returned 0 rows! RLS policy might be blocking it.");
  } else {
     console.log("Update successful!");
  }
}
run();

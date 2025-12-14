// "use server"
import { createClient } from "@supabase/supabase-js";


// export let supabase=()=>{
//    const supabase = createClient(
//         process.env.NEXT_PUBLIC_SUPABASE_URL,
//         process.env.SUPABASE_SERVICE_ROLE_KEY
//     );
//     return supabase
// }

export const supabase=createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
)


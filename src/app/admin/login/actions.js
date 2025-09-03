'use server'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData) {
	const supabase = await createClient()

	const data = {
	  email: formData.get('email'),
	  password: formData.get('password'),
	}
	
	const { error } = await supabase.auth.signInWithPassword(data)
	
	if (error) {
		return { error: error.message };
	}
	
	redirect('/admin/dashboard');
}
import { supabase } from "../supabaseClient";

// Fetch semua berita
export async function fetchAllNews() {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Gagal mengambil data:", error.message);
    return [];
  }

  return data;
}

// Fetch berita berdasarkan ID
export async function fetchNewsById(id) {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Gagal mengambil detail berita:", error.message);
    return null;
  }

  return data;
}

// Fetch semua projek
export async function fetchAllProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Gagal mengambil data:", error.message);
    return [];
  }

  return data;
}

// Fetch projek berdasarkan ID
export async function fetchProjectsById(id) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Gagal mengambil detail projek:", error.message);
    return null;
  }

  return data;
}

// Fetch semua donasi
export async function fetchAllDonations() {
  const { data, error } = await supabase
    .from("donations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Gagal mengambil data:", error.message);
    return [];
  }

  return data;
}

// Fetch donasi berdasarkan ID
export async function fetchDonationsById(id) {
  const { data, error } = await supabase
    .from("donations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Gagal mengambil detail donasi:", error.message);
    return null;
  }

  return data;
}

export async function fetchAllPublications() {
  const { data, error } = await supabase
    .from("publications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Gagal mengambil data:", error.message);
    return [];
  }

  return data;
}

export async function fetchPublicationsById(id) {
  const { data, error } = await supabase
    .from("publications")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Gagal mengambil detail publikasi:", error.message);
    return null;
  }

  return data;
}

// Fetch semua gallery
export async function fetchAllGallery() {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Gagal mengambil data:", error.message);
    return [];
  }

  return data;
}

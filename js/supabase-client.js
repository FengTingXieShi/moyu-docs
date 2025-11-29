const SUPABASE_URL = 'https://jdsjinygdnztlysiysho.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impkc2ppbnlnZG56dGx5c2l5c2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNTM0MzksImV4cCI6MjA3OTgyOTQzOX0.1XdG4nC6wpvUSJ0oRT-XeG_9z4IedmHY98dR_ZJaV4U';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function getDocuments() {
  const { data, error } = await supabase.from('documents').select('*');
  if (error) {
    console.error('获取文档失败:', error.message);
    return [];
  }
  return data;
}

export async function createDocument(title, summary, content, tags) {
  const { data, error } = await supabase.from('documents').insert([
    { title, summary, content, tags, updated_at: new Date().toISOString() }
  ]);
  if (error) {
    console.error('创建文档失败:', error.message);
    return null;
  }
  return data[0];
}

export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    console.error('注册失败:', error.message);
    return null;
  }
  return data;
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    console.error('登录失败:', error.message);
    return null;
  }
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('登出失败:', error.message);
    return false;
  }
  return true;
}

export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session);
  });
}

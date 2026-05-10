'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/lib/context';
import RichTextEditor from '@/components/ui/RichTextEditor';

interface NewsForm {
  title_en: string;
  title_hy: string;
  content_en: string;
  content_hy: string;
  show_on_home: boolean;
}

export default function AdminNewsPage() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<NewsForm>({ title_en: '', title_hy: '', content_en: '', content_hy: '', show_on_home: false });
  const { language } = useApp();

  async function fetchNews() {
    const { supabase } = await import('@/lib/supabase');
    const { data } = await supabase.from('news').select('*').order('created_at', { ascending: false });
    if (data) setNews(data);
    setLoading(false);
  }

    
    setForm({ title_en: '', title_hy: '', content_en: '', content_hy: '', show_on_home: false });
    setEditingId(null);
    setShowForm(false);
    fetchNews();
  }

  function handleEdit(item: any) {
    setEditingId(item.id);
    setForm({ 
      title_en: item.title_en, 
      title_hy: item.title_hy, 
      content_en: item.content_en, 
      content_hy: item.content_hy,
      show_on_home: item.show_on_home || false
    });
    setShowForm(true);
  }
...
              <RichTextEditor 
                value={form.content_hy} 
                onChange={content_hy => setForm({...form, content_hy})} 
                placeholder="Content (Armenian)" 
              />
              <label className="flex items-center gap-2 mt-4 text-slate-700">
                <input 
                  type="checkbox" 
                  checked={form.show_on_home} 
                  onChange={e => setForm({...form, show_on_home: e.target.checked})} 
                />
                Show on Home
              </label>
            </div>
          </div>
...
                  <td className="p-4">
                    <button onClick={() => handleEdit(item)} className="text-blue-500 hover:text-blue-400 text-sm mr-4">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-400 text-sm">
                      {language === 'en' ? 'Delete' : 'Ջնջել'}
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

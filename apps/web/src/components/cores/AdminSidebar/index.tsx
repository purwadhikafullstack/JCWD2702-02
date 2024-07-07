import { usePathname } from 'next/navigation'
import AdminSidebarDesktop from './desktop'

export default function AdminSidebar() {
  const pathname = usePathname()

  if (!pathname.includes('/admin')) return null
  return <div>{pathname == '/admin' ? null : <AdminSidebarDesktop />}</div>
}

import { Link } from 'react-router-dom';

export default function AdminNav() {
  return (
    <div className="admin-nav">
      <Link to="/admin">Dashboard</Link>
      <Link to="/admin/cars">Manage Cars</Link>
      <Link to="/admin/users">Manage Users</Link>
    </div>
  );
}

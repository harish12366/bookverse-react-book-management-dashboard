import {
  BookOpen,
  LayoutDashboard,
  Library,
  Users,
  Settings,
  Bookmark,
} from "lucide-react";

function Header() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          <BookOpen size={23} />
        </div>
        <div>
          <h2>BOOKVERSE</h2>
          <span>LIBRARY SPACE</span>
        </div>
      </div>

      <div className="sidebar-section">
        <p>WORKSPACE</p>

        <a className="side-link active" href="#overview">
          <LayoutDashboard size={18} />
          Overview
        </a>

        <a className="side-link" href="#library">
          <Library size={18} />
          My Library
        </a>

        <a className="side-link" href="#authors">
          <Users size={18} />
          Authors
        </a>

        <a className="side-link" href="#saved">
          <Bookmark size={18} />
          Collections
        </a>
      </div>

      <div className="sidebar-bottom">
        <a className="side-link" href="#settings">
          <Settings size={18} />
          Settings
        </a>

        <div className="sidebar-profile">
          <div className="profile-avatar">H</div>
          <div>
            <strong>Administrator</strong>
            <span>Library Owner</span>
          </div>
        </div>
      </div>

      <div className="sidebar-footer">
        YOUR PERSONAL DIGITAL LIBRARY
      </div>
    </aside>
  );
}

export default Header;
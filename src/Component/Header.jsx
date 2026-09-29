import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">

      <div className="logo">
        MediBridge AI
      </div>

      <nav>

        <Link to="/">Home</Link>

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/patient">
          Patient
        </Link>

        <Link to="/doctor">
          Doctor
        </Link>

        <Link to="/appointment">
          Appointment
        </Link>

      </nav>

    </header>
  );
}

export default Header;
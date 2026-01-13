import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ModeratorTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMyTickets = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/tickets/my`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "Failed to fetch assigned tickets");
          return;
        }

        setTickets(data);
      } catch (err) {
        console.error(err);
        alert("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchMyTickets();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading assigned tickets...</div>;
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Assigned Tickets</h2>

      <div className="space-y-3">
        {tickets.map((ticket) => (
          <Link
            key={ticket._id}
            to={`/tickets/${ticket._id}`}
            className="card shadow-md p-4 bg-gray-100 hover:bg-gray-200 transition"
          >
            <h3 className="font-bold text-lg">{ticket.title}</h3>
            <p className="text-sm">{ticket.description}</p>
            <p className="text-sm text-gray-500">
              Created At: {new Date(ticket.createdAt).toLocaleString()}
            </p>
          </Link>
        ))}

        {tickets.length === 0 && (
          <p className="text-gray-500">
            No tickets assigned to you yet.
          </p>
        )}
      </div>
    </div>
  );
}

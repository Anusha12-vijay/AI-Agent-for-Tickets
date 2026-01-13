
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

/* 🔐 Decode JWT to get user role */
const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};

export default function TicketDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const user = getUserFromToken();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/tickets/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "Failed to fetch ticket");
          return;
        }

        setTicket(data.ticket);
      } catch (err) {
        console.error(err);
        alert("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  

  /* 🗑️ Delete ticket (ADMIN ONLY) */
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ticket?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/tickets/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Delete failed");
        return;
      }

      alert("Ticket deleted successfully");
      navigate("/tickets");
    } catch (err) {
      console.error(err);
      alert("Error deleting ticket");
    }
  };
  const handleResolve = async () => {
  const confirm = window.confirm("Mark this ticket as RESOLVED?");
  if (!confirm) return;

  try {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/tickets/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "RESOLVED" }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to update status");
      return;
    }

    setTicket(data.ticket); // 🔥 instant UI update
    alert("Ticket marked as RESOLVED");
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};


  if (loading)
    return <div className="text-center mt-10">Loading ticket details...</div>;

  if (!ticket)
    return <div className="text-center mt-10">Ticket not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Ticket Details</h2>

      {/* 🔴 Admin Delete Button */}
      {user?.role === "admin" && (
        <button
          onClick={handleDelete}
          className="btn btn-error mb-4"
        >
          Delete Ticket
        </button>
      )}
      {/* ✅ Moderator Resolve Button */}
{user?.role === "moderator" &&
  ticket.status !== "RESOLVED" && (
    <button
      onClick={handleResolve}
      className="btn btn-success mb-4 ml-2"
    >
      Mark as Resolved
    </button>
)}


      <div className="card bg-gray-200 shadow p-4 space-y-4">
        <h3 className="text-xl font-semibold">{ticket.title}</h3>
        <p>{ticket.description}</p>
        {user?.role === "user" && ticket.suggestions && (
  <div className="mt-6">
    <div className="divider">💡 Did you try?</div>

    <div className="prose max-w-none bg-blue-50 p-4 rounded">
      <ReactMarkdown>
        {ticket.suggestions}
      </ReactMarkdown>
    </div>
  </div>
)}


        {ticket.status && (
          <>
            <div className="divider">Metadata</div>

            <p>
              <strong>Status:</strong> {ticket.status}
            </p>

            {ticket.priority && (
              <p>
                <strong>Priority:</strong> {ticket.priority}
              </p>
            )}

            {ticket.relatedSkills?.length > 0 && (
              <p>
                <strong>Related Skills:</strong>{" "}
                {ticket.relatedSkills.join(", ")}
              </p>
            )}

            {ticket.helpfulNotes && (
              <div>
                <strong>Helpful Notes:</strong>
                <div className="prose max-w-none rounded mt-2">
                  <ReactMarkdown>
                    {ticket.helpfulNotes}
                  </ReactMarkdown>
                </div>
              </div>
            )}

            {ticket.assignedTo && (
              <p>
                <strong>Assigned To:</strong>{" "}
                {ticket.assignedTo.email}
              </p>
            )}

            {ticket.createdAt && (
              <p className="text-sm text-gray-500 mt-2">
                Created At:{" "}
                {new Date(ticket.createdAt).toLocaleString()}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}


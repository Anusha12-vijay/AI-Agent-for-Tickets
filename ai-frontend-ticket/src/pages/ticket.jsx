// // import { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import ReactMarkdown from "react-markdown";

// // export default function TicketDetailsPage() {
// //   const { id } = useParams();
// //   const [ticket, setTicket] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   const token = localStorage.getItem("token");

// //   useEffect(() => {
// //     const fetchTicket = async () => {
// //       try {
// //         const res = await fetch(
// //           `${import.meta.env.VITE_SERVER_URL}/tickets/${id}`,
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           }
// //         );
// //         const data = await res.json();
// //         if (res.ok) {
// //           setTicket(data.ticket);
// //         } else {
// //           alert(data.message || "Failed to fetch ticket");
// //         }
// //       } catch (err) {
// //         console.error(err);
// //         alert("Something went wrong");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchTicket();
// //   }, [id]);

// //   if (loading)
// //     return <div className="text-center mt-10">Loading ticket details...</div>;
// //   if (!ticket) return <div className="text-center mt-10">Ticket not found</div>;

// //   return (
// //     <div className="max-w-3xl mx-auto p-4">
// //       <h2 className="text-2xl font-bold mb-4">Ticket Details</h2>

// //       <div className="card bg-gray-200 shadow p-4 space-y-4">
// //         <h3 className="text-xl font-semibold">{ticket.title}</h3>
// //         <p>{ticket.description}</p>

// //         {/* Conditionally render extended details */}
// //         {ticket.status && (
// //           <>
// //             <div className="divider">Metadata</div>
// //             <p>
// //               <strong>Status:</strong> {ticket.status}
// //             </p>
// //             {ticket.priority && (
// //               <p>
// //                 <strong>Priority:</strong> {ticket.priority}
// //               </p>
// //             )}

// //             {ticket.relatedSkills?.length > 0 && (
// //               <p>
// //                 <strong>Related Skills:</strong>{" "}
// //                 {ticket.relatedSkills.join(", ")}
// //               </p>
// //             )}

// //             {ticket.helpfulNotes && (
// //               <div>
// //                 <strong>Helpful Notes:</strong>
// //                 <div className="prose max-w-none rounded mt-2">
// //                   <ReactMarkdown>{ticket.helpfulNotes}</ReactMarkdown>
// //                 </div>
// //               </div>
// //             )}

// //             {ticket.assignedTo && (
// //               <p>
// //                 <strong>Assigned To:</strong> {ticket.assignedTo?.email}
// //               </p>
// //             )}

// //             {ticket.createdAt && (
// //               <p className="text-sm text-gray-500 mt-2">
// //                 Created At: {new Date(ticket.createdAt).toLocaleString()}
// //               </p>
// //             )}
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// export default function Tickets() {
//   const [form, setForm] = useState({ title: "", description: "" });
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("token");

//   const fetchTickets = async () => {
//     try {
//       const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();
//       setTickets(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("Failed to fetch tickets:", err);
//     }
//   };

//   useEffect(() => {
//     fetchTickets();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || "Ticket creation failed");
//         return;
//       }

//       setForm({ title: "", description: "" });
//       fetchTickets();
//     } catch (err) {
//       console.error(err);
//       alert("Error creating ticket");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Create Ticket</h2>

//       <form onSubmit={handleSubmit} className="space-y-3 mb-8">
//         <input
//           name="title"
//           value={form.title}
//           onChange={handleChange}
//           placeholder="Ticket Title"
//           className="input input-bordered w-full"
//           required
//         />

//         <textarea
//           name="description"
//           value={form.description}
//           onChange={handleChange}
//           placeholder="Ticket Description"
//           className="textarea textarea-bordered w-full"
//           required
//         />

//         <button
//           className="btn btn-primary"
//           type="submit"
//           disabled={loading}
//         >
//           {loading ? "Submitting..." : "Submit Ticket"}
//         </button>
//       </form>

//       <h2 className="text-xl font-semibold mb-2">All Tickets</h2>

//       <div className="space-y-3">
//         {tickets.map((ticket) => (
//           <Link
//             key={ticket._id}
//             to={`/tickets/${ticket._id}`}
//             className="card shadow-md p-4 bg-gray-100 hover:bg-gray-200 transition"
//           >
//             <h3 className="font-bold text-lg">{ticket.title}</h3>
//             <p className="text-sm">{ticket.description}</p>
//             <p className="text-sm text-gray-500">
//               Created At:{" "}
//               {new Date(ticket.createdAt).toLocaleString()}
//             </p>
//           </Link>
//         ))}

//         {tickets.length === 0 && (
//           <p className="text-gray-500">No tickets submitted yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }

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

      <div className="card bg-gray-200 shadow p-4 space-y-4">
        <h3 className="text-xl font-semibold">{ticket.title}</h3>
        <p>{ticket.description}</p>

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


import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Topbar from "../../components/Topbar/Topbar";
import Footer from "../../components/Footer/Footer";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
function Session() {
  const { courseName, sessionId } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [sessions, setSessions] = useState([]);

  const fetchSessionData = () => {
    const token = Cookies.get("user");
    if (token) {
        fetch(
            `${process.env.REACT_APP_BACKEND_URL}/courses/${courseName}/${sessionId}`,
            {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
            
          )
            .then((response) => response.json())
            .then((data) => {
                console.log("Session Data:", data.session);
              setSessionData(data.session);
              setSessions(data.sessions || []);
            })
            .catch((error) => console.error("Error fetching session data:", error));
    }
  };
  useEffect(() => {
    fetchSessionData();
  }, [courseName, sessionId]);
  return (
    <>
      <Navbar />
      <Topbar />
      <Container fluid className="my-4">
        <Row>
          {/* Sidebar */}
          <Col md={4} className="mb-4">
            <div className="border rounded p-3 bg-light">
              <h5 className="mb-3">📚 لیست جلسات</h5>
              <ul className="list-group">
                {sessions.map((session) => (
                  <li
                    key={session._id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      ▶️{" "}
                      <Link to={`/${courseName}/${session._id}`}>
                        {session.title}
                      </Link>
                    </div>
                    <span className="text-muted">{session.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Col>

          {/* Video Player */}
          <Col md={8}>
            <div className="border rounded p-3">
              {/* Video Header */}
              <div className="d-flex justify-content-between align-items-center bg-dark text-white p-3 rounded">
                <Link
                  to={`/course-info/${courseName}`}
                  className="text-white text-decoration-none"
                >
                  <i className="bi bi-house-door color-white"></i> بازگشت به
                  دوره
                </Link>
                <div>
                  <i className="bi bi-play-circle me-2"></i>{" "}
                  {sessionData?.title || "Loading..."}
                </div>
              </div>

              {/* Video */}
              <div className="my-4">
                <div className="my-4">
                  {sessionData && sessionData.video ? (
                    <video
                      controls
                      className="w-100"
                      src={`https://sabzlearn-backend.onrender.com/courses/covers/${sessionData.video}`}
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="text-center">Loading video...</div>
                  )}
                </div>
              </div>

              {/* Download + Navigation */}
              <div className="d-flex justify-content-between">
                <Button variant="secondary">⬅️ Previous</Button>

                <Button
                  variant="success"
                  disabled={!sessionData || !sessionData.video}
                >
                  {sessionData && sessionData.video ? (
                    <a
                      href={`https://sabzlearn-backend.onrender.com/courses/covers/${sessionData.video}`}
                      download
                      className="text-white text-decoration-none"
                    >
                      Download 📥
                    </a>
                  ) : (
                    "Loading..."
                  )}
                </Button>

                <Button variant="secondary">Next ➡️</Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Session;

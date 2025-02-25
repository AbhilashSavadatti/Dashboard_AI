import { useEffect, useState } from "react";
import "./styles.css";
import { useNavigate, useParams } from "react-router-dom";

import { pdfjs } from "react-pdf";
import { Share2Icon } from "lucide-react";

export default function Dashboard() {
  const [widgets, setWidgets] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [uuid, setUuid] = useState("");
  const [resizing, setIsResizing] = useState(false);
  const [dataItem, setDataItem] = useState({});
  const { name: folderId } = useParams();
  const navigate = useNavigate();

  const user_name = "user3";

  useEffect(() => {
    const fetchDashboards = async () => {
      try {
        const response = await fetch(
          `https://v3-tjof.onrender.com/api/dashboards?username=${user_name}`
        );
        const data = await response.json();

        if (data.success) {
          const folders = Object.values(data.dashboards);
          const filteredData = folderId
            ? folders.find((folder) => folder.dashboard_id === folderId)
            : folders[0];

          if (filteredData) {
            setDataItem(filteredData || {});
            setUuid(folderId); // Ensure UUID is set correctly
          }
        } else {
          console.error("Error fetching dashboards:", data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (user_name && folderId) {
      fetchDashboards().catch((err) => console.error("Fetch failed:", err));
    }
  }, [folderId]);

  useEffect(() => {
    const fetchWidgets = async () => {
      try {
        const response = await fetch(
          `https://v3-tjof.onrender.com/api/get_cards/${folderId}`
        );
        const data = await response.json();

        if (data.dashboard_items?.widgets) {
          setWidgets(data.dashboard_items.widgets);
        } else {
          setWidgets([]); // Reset widgets if no widgets found
        }
      } catch (error) {
        console.error("Error fetching widgets:", error);
      }
    };

    if (folderId) {
      fetchWidgets().catch((err) =>
        console.error("Fetch widgets failed:", err)
      );
    }
  }, [folderId]);

  const handleResizeStart = (index, e) => {
    e.preventDefault();
    setIsResizing(true);
    const initialWidth = widgets[index].width;
    const initialHeight = widgets[index].height;
    const initialX = e.clientX;
    const initialY = e.clientY;

    const onMouseMove = (moveEvent) => {
      const newWidth = Math.max(
        initialWidth + (moveEvent.clientX - initialX),
        100
      );
      const newHeight = Math.max(
        initialHeight + (moveEvent.clientY - initialY),
        100
      );

      setWidgets((prevWidgets) =>
        prevWidgets.map((widget, i) =>
          i === index
            ? { ...widget, width: newWidth, height: newHeight }
            : widget
        )
      );
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      setIsResizing(false);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp, { once: true });
  };

  const handleDragStart = (index, e) => {
    if (resizing) return;

    const initialX = e.clientX;
    const initialY = e.clientY;
    const { x, y } = widgets[index].position;

    const onMouseMove = (moveEvent) => {
      const newX = x + (moveEvent.clientX - initialX);
      const newY = y + (moveEvent.clientY - initialY);

      setWidgets((prevWidgets) =>
        prevWidgets.map((widget, i) =>
          i === index ? { ...widget, position: { x: newX, y: newY } } : widget
        )
      );
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const saveUpdatedWidgets = async () => {
    try {
      const response = await fetch("https://v3-tjof.onrender.com/api/update_card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dashboard_id: folderId,
          widgets: widgets,
        }),
      });
      const data = await response.json();
      if (data.success) {
        console.log("Widgets updated successfully");
      } else {
        console.error("Error updating widgets:", data.message);
      }
    } catch (error) {
      console.error("Error saving widgets:", error);
    }
  };

  const toggleEditMode = () => {
    if (isEditing) {
      saveUpdatedWidgets();
    }
    setIsEditing((prev) => !prev);
  };

  const baseUrl = window.location.origin;

  const handleShare = () => {
    const shareUrl = `${baseUrl}/shared-dashboard/${user_name}/${uuid}`;
    window.open(shareUrl, "_blank");
  };

  return (
    <div>
      <h1>Dashboard: {dataItem.dashboard_name || "Loading..."}</h1>

      <button
        className={`save-button ${isEditing ? "edit" : "save"}`}
        onClick={toggleEditMode}
      >
        {isEditing ? "Save" : "Edit"}
      </button>

      <button className="sharer-button" onClick={handleShare}>
        <Share2Icon />
      </button>

      <div
        style={{
          position: "relative",
          width: "calc(100vw - 240px)",
          height: "calc(100vh - 60px)",
          paddingTop: "60px",
          paddingLeft: "240px",
          boxSizing: "border-box",
          overflowX: "auto",
          overflowY: "auto",
          zIndex: 0,
        }}
        className="dashboard"
      >
        {widgets?.map((widget, index) => (
          <div
            key={widget.cardNumber}
            className="widget"
            style={{
              left: `${widget.position.x}px`,
              top: `${widget.position.y}px`,
              width: `${widget.width}px`,
              height: `${widget.height}px`,
              cursor: isEditing && !resizing ? "move" : "default",
            }}
            onMouseDown={(e) => {
              if (isEditing && !resizing) {
                handleDragStart(index, e);
              }
            }}
          >
            {isEditing && (
              <div
                className="widget-resize-handle"
                onMouseDown={(e) => handleResizeStart(index, e)}
              ></div>
            )}
            <div className="widget-values">
              <h3>Widget : {widget.cardNumber}</h3>
              <div
                className="widget-html-content"
                dangerouslySetInnerHTML={{ __html: widget.html }} // Render the HTML content here
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

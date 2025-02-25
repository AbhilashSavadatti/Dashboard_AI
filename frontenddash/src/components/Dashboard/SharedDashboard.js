import { useEffect, useState } from "react";
import "./styles.css";
import { useNavigate, useParams } from "react-router-dom";
import Share from "./../../hooks/ShareButton";

export default function SharedDashboard() {
  const [widgets, setWidgets] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [resizing, setIsResizing] = useState(false);
  const [dataItem, setDataItem] = useState({});
  const { name: folderId } = useParams();
  const navigate = useNavigate();
  const [deviceType, setDeviceType] = useState("desktop");
  const user_name = "user3";

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) setDeviceType("mobile");
      else if (width < 1024) setDeviceType("tablet");
      else setDeviceType("desktop");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

          setDataItem(filteredData || {});
        }
      } catch (error) {
        console.error("Error fetching dashboards:", error);
      }
    };

    if (user_name && folderId) {
      fetchDashboards();
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
          let updatedWidgets = [];

          if (deviceType === "mobile") {
            let lastY = 0;
            const extraMobileGap = 30;

            updatedWidgets = data.dashboard_items.widgets.map((widget) => {
              const newWidget = {
                ...widget,
                position: { x: 0, y: lastY },
              };
              lastY += widget.height + extraMobileGap;
              return newWidget;
            });
          } else if (deviceType === "tablet") {
            let columns = [0, 0]; // Track y-positions of two columns
            const gap = 10;

            updatedWidgets = data.dashboard_items.widgets.map(
              (widget, index) => {
                const minCol = columns[0] <= columns[1] ? 0 : 1;
                const newWidget = {
                  ...widget,
                  position: {
                    x: minCol * (widget.width + gap),
                    y: columns[minCol],
                  },
                };
                columns[minCol] += widget.height + gap;
                return newWidget;
              }
            );
          } else {
            updatedWidgets = data.dashboard_items.widgets;
          }

          setWidgets(updatedWidgets);
        }
      } catch (error) {
        console.error("Error fetching widgets:", error);
      }
    };

    if (folderId) {
      fetchWidgets();
    }
  }, [folderId, deviceType]);

  return (
    <div>
      <h1>Dashboard: {dataItem.dashboard_name || "Loading..."}</h1>

      <div className="dashboard" style={{ overflow: "auto", height: "100vh" }}>
        {widgets.map((widget, index) => (
          <div
            key={widget.cardNumber}
            className="widget"
            style={{
              left: `${widget.position.x}px`,
              top: `${widget.position.y}px`,
              width: `${widget.width}px`,
              height: `${widget.height}px`,
            }}
          >
            <div className="widget-values">
              <h3>Widget: {widget.cardNumber}</h3>
              <div
                className="widget-html-content"
                dangerouslySetInnerHTML={{ __html: widget.html }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

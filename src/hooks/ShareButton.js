import { Share2Icon } from "lucide-react";
import "./style.css";

export default function Share({ label, text, title, url, onShare }) {
  const shareDetails = { url, title, text };

  const handleSharing = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareDetails);
        console.log("Hooray! Your content was shared to the world.");
        if (onShare) onShare();
      } catch (error) {
        console.log(`Oops! I couldn't share: ${error}`);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareDetails.url);
        alert("Web share not supported. URL copied to clipboard.");
        if (onShare) onShare();
      } catch (error) {
        console.log(`Oops! Clipboard error: ${error}`);
      }
    }
  };

  return (
    <button className="sharer-button" onClick={handleSharing}>
      <Share2Icon />
    </button>
  );
}

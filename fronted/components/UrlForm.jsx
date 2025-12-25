import { useState } from "react";
import { createShortUrl } from "../services/api";

export default function UrlForm() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const validUrl = (value) => {
    if (!value) return false;
    try {
      new URL(value);
      return true;
    } catch {
      try {
        new URL(`https://${value}`);
        return true;
      } catch {
        return false;
      }
    }
  };

  const handleSubmit = async () => {
    setError("");
    setShortUrl("");
    if (!validUrl(url)) return setError("Please enter a valid URL");

    setLoading(true);
    try {
      const normalized = (() => {
        try {
          return new URL(url).toString();
        } catch {
          return `https://${url}`;
        }
      })();

      const res = await createShortUrl(normalized);
      setShortUrl(res.data?.shortUrl || "");
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  const copyUrl = async () => {
    if (!shortUrl) return;
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Copy failed — allow clipboard permission")
    }
  };

  return (
    <div className="max-w-xl w-full bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Create a Short Link</h2>

      <label className="text-sm text-gray-600">Paste your long URL</label>
      <div className="flex gap-3 mt-2">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="example.com or https://example.com"
          className="flex-1 p-3 border rounded-md outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "..." : "Shorten"}
        </button>
      </div>

      {error && <p className="text-red-600 mt-3">{error}</p>}

      {shortUrl && (
        <div className="mt-4 bg-gray-50 p-3 rounded-md">
          <p className="text-sm text-gray-500 mb-2">Your short link</p>
          <div className="flex items-center gap-3">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 break-all"
            >
              {shortUrl}
            </a>
            <button
              onClick={copyUrl}
              className="ml-auto bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
            >
              {copied ? "Copied ✅" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

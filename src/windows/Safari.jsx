import { WindowControls } from "@components";
import WindowWrapper from "@hoc/WindowWrapper";
import { courses } from "@constants";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  PanelLeft,
  Plus,
  Search,
  Share,
  ShieldHalf,
} from "lucide-react";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function Safari() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activePdf, setActivePdf] = useState(null);
  const [numPages, setNumPages] = useState(null);

  const onPdfLoad = ({ numPages }) => setNumPages(numPages);

  const handleBack = () => {
    if (activePdf) setActivePdf(null);
    else if (activeCategory) setActiveCategory(null);
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <div id="window-header">
        <WindowControls target="safari" />

        <PanelLeft className="ml-10 icon" />

        <div className="flex items-center gap-1 ml-5">
          <ChevronLeft
            className="icon cursor-pointer"
            onClick={handleBack}
          />
          <ChevronRight className="icon opacity-40" />
        </div>

        <div className="flex-1 flex-center gap-3">
          <ShieldHalf className="icon" />
          <div className="search">
            <Search className="icon" />
            <input
              readOnly
              className="flex-1"
              value={
                activePdf
                  ? activePdf
                  : activeCategory
                  ? activeCategory.name
                  : "Courses"
              }
            />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <Share className="icon" />
          <Plus className="icon" />
          <Copy className="icon" />
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="blog">

        {/* ========= 1️⃣ CATEGORY LIST ========= */}
        {!activeCategory && !activePdf && (
          <>
            <h2>Courses</h2>

            <div className="space-y-6">
              {courses.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={() => setActiveCategory(cat)}
                >
                  <img src={cat.icon} className="w-10" />
                  <h3 className="font-semibold">{cat.name}</h3>
                </div>
              ))}
            </div>
          </>
        )}

        {activeCategory && !activePdf && (
          <>
            <h2>{activeCategory.name}</h2>

            <div className="course-grid grid grid-cols-3 gap-6">

              {activeCategory.items.map((item) => {
                const pdfPath = `${activeCategory.basePath}/${item.file}`;

                return (
                  <div
                    key={item.id}
                    className="cursor-pointer group"
                    onClick={() => setActivePdf(pdfPath)}
                  >
                    <div className="rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition">
                      <Document file={pdfPath}>
                        <Page
                          pageNumber={1}
                          width={180}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                        />
                      </Document>
                    </div>

                    <p className="mt-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition">
                      {item.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ========= 3️⃣ FULL PDF VIEWER ========= */}
        {activePdf && (
          <div className="h-[70vh] overflow-auto">
            <Document file={activePdf} onLoadSuccess={onPdfLoad}>
              {Array.from(new Array(numPages), (_, i) => (
                <Page
                  key={i}
                  pageNumber={i + 1}
                  width={700}
                  className="mb-6"
                />
              ))}
            </Document>
          </div>
        )}
      </div>
    </>
  );
}

const SafariWindow = WindowWrapper(Safari, "safari");
export default SafariWindow;

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

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {courses.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setActiveCategory(cat)}
                className="
                  group cursor-pointer
                  rounded-2xl bg-white
                  p-8 flex flex-col items-center
                  shadow-sm hover:shadow-xl
                  transition-all duration-300
                "
              >
                <div
                  className="
                    w-20 h-20 rounded-2xl
                    bg-gray-100
                    flex items-center justify-center
                    group-hover:scale-110 transition
                  "
                >
                  <img
                    src={cat.icon}
                    alt={cat.name}
                    className="w-12 h-12 object-contain"
                  />
                </div>

                <h3 className="mt-4 text-lg font-semibold text-gray-800">
                  {cat.name}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  {cat.items.length} lessons
                </p>
              </div>
            ))}
          </div>

                    </>
                  )}

{activeCategory && !activePdf && (
  <>
    <h2>{activeCategory.name}</h2>

    {/* EMPTY STATE */}
    {activeCategory.items.length === 0 && (
      <div className="flex flex-col items-center justify-center h-[40vh] text-center">
        <div className="text-6xl mb-4">🚧</div>
        <h3 className="text-xl font-semibold text-gray-800">
          Coming Soon
        </h3>
        <p className="text-sm text-gray-500 mt-2 max-w-xs">
          This course is currently under preparation.
          Content will be available very soon.
        </p>
      </div>
    )}

    {/* PDF GRID */}
    {activeCategory.items.length > 0 && (
      <div className="course-grid grid grid-cols-2 md:grid-cols-3 gap-8">
        {activeCategory.items.map((item) => {
          const pdfPath = `${activeCategory.basePath}/${item.file}`;

          return (
            <div
              key={item.id}
              className="group cursor-pointer"
              onClick={() => setActivePdf(pdfPath)}
            >
              <div className="pdf-card">
                <Document file={pdfPath}>
                  <Page
                    pageNumber={1}
                    width={200}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </Document>
              </div>

              <p className="pdf-title">{item.title}</p>
            </div>
          );
        })}
      </div>
    )}
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

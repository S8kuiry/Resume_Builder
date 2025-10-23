import React from 'react';
import ModernTemplate from '../assets/templates/ModernTemplate';
import ClassicTemplate from '../assets/templates/ClassicTemplate';
import MinimalTemplate from '../assets/templates/MinimalTemplate';
import MinimalImageTemplate from '../assets/templates/MinimalImageTemplate';

const Preview = ({ data, accentColor, template, removeBackground, classes = "" }) => {
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;
      case "classic":
        return <ClassicTemplate data={data} accentColor={accentColor} />;
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div
      className={`w-full min-h-[300px] shadow-lg overflow-hidden rounded-lg transition-colors duration-300 ${classes}`}
      style={{
        backgroundColor: removeBackground ? accentColor : "#ffffff", // ✅ use accent color if background removed
      }}
    >
      <div
        id="resume-preview"
        className="border border-gray-200 rounded-lg shadow-sm"
      >
        {renderTemplate()}
      </div>

      <style jsx>{`
        @page {
          size: letter;
          margin: 0;
        }

        @media print {
          html,
          body {
            width: 8.5in;
            height: 11in;
            overflow: hidden;
          }
        }

        #resume-preview {
          width: 100%;
          height: auto;
          margin: 0;
          padding: 0;
          box-shadow: none !important;
          border: none !important;
        }
      `}</style>
    </div>
  );
};

export default Preview;

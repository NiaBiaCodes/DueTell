type Props = {
  text: string;
};

function SyllabusResults({ text }: Props) {
  // Break PDF text into smaller useful chunks
  const chunks = text
    .split(/(?<=[.!?;])\s+|•|\n+/)
    .map((item) => item.trim())
    .filter((item) => item.length > 5);

  const deadlines = chunks
    .filter((item) =>
      /\bdue\b|deadline|exam|midterm|final|quiz|assignment|homework|project/i.test(
        item
      )
    )
    .slice(0, 8);

  const grading = chunks
    .filter((item) =>
      /%|grading|grade|points|weight|participation/i.test(item)
    )
    .slice(0, 8);

  const policies = chunks
    .filter((item) =>
      /attendance|late|absence|policy|academic integrity|accessibility/i.test(
        item
      )
    )
    .slice(0, 8);

  return (
    <div className="results-container">

      <div className="info-card">
        <h2>📅 Important Dates & Assignments</h2>

        {deadlines.length > 0 ? (
          <ul>
            {deadlines.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>No deadlines detected.</p>
        )}
      </div>

      <div className="info-card">
        <h2>📊 Grading Breakdown</h2>

        {grading.length > 0 ? (
          <ul>
            {grading.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>No grading information detected.</p>
        )}
      </div>

      <div className="info-card">
        <h2>📌 Important Policies</h2>

        {policies.length > 0 ? (
          <ul>
            {policies.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>No course policies detected.</p>
        )}
      </div>

      <details className="full-text">
        <summary>View Full Extracted Text</summary>
        <p>{text}</p>
      </details>

    </div>
  );
}

export default SyllabusResults;
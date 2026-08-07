import { courses } from "../Data/mockData";

function Courses() {
  return (
    <main>
      <h1>Courses</h1>
      <p>One card per syllabus you've uploaded.</p>

      <div>
        {courses.map((course) => (
          <section key={course.id}>
            <h2>{course.name}</h2>
            <p>{course.code}</p>
            <p>Professor: {course.professor}</p>
            <p>Semester: {course.semester}</p>
            <p>Next assignment: {course.nextAssignment}</p>
            <p>Due: {course.nextDueDate}</p>
          </section>
        ))}
      </div>
    </main>
  );
}

export default Courses;
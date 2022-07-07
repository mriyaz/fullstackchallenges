


const Header = ({ header }) => {
    return (<>
        <h2>{header}</h2>
    </>)
}

const Part = ({ part }) => {
    return (
        <>
            {part.name} {part.exercises} <br />
        </>
    )
}

const Content = ({ content }) => {
    return (
        <>
            {content.map(part =>
                <Part key={part.id} part={part} />
            )}
        </>
    )
}

function sumExercise(parts) {
    return parts.reduce((sum, item) => sum + item.exercises, 0);
}

const Course = ({ course }) => {
    return (
        <>
            <Header header={course.name} />
            <Content content={course.parts} />
            <b>total of {sumExercise(course.parts)} exercises</b>
        </>

    );
}
export default Course;
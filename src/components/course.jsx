const Total = ({ parts }) => {
  const sum = parts.reduce((total, part) => {
    console.log('Adding exercises:', total, part.exercises)
    return total + part.exercises
  }, 0)
  return <p><strong>Total exercises: {sum}</strong></p>
}

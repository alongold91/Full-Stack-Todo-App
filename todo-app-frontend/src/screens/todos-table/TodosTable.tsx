import { useGetAllTodos } from '../../services/todosQueries';

function TodosTable() {
  const { data, isPending, isError } = useGetAllTodos();

  if (isPending) return <p>Pending...</p>;

  if (isError) return <p>error...</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Header</th>
          <th>Content</th>
          <th>Is Done</th>
          <th>User First Name</th>
        </tr>
      </thead>
      <tbody>
        {data.map(todo => (
           <tr key={todo.id}>
           <td>{todo.header}</td>
           <td>{todo.content}</td>
           <td>{String(todo.isDone)}</td>
           <td>{todo.user.firstName}</td>
         </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TodosTable;

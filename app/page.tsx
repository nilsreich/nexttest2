import { db } from '@/db/index'
import { todoTable } from "@/db/schema";
import { addTodo, deleteTodo, toggleTodo } from '@/app/actions';
import { auth } from '@clerk/nextjs/server'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { eq } from 'drizzle-orm';
import { XIcon } from 'lucide-react';

export default async function Home() {
  
  const { userId } = auth()

  if (!userId) {
    return (
      <div>nix</div>
    )
  }

  const result = await db.select().from(todoTable).where(eq(todoTable.author, userId));

  return (
    <div className='p-4'>
      <h1>Todo List</h1>
      <form action={addTodo} className='flex gap-2 items-center'>
        <Input type="text" name="todo" placeholder="Todo" />
        <Button type="submit">Add Todo</Button>
      </form>
      <div className='mt-2 border-t-2 pt-2'>

        {result.map((item) => (
          <div key={item.id} className='flex gap-2 items-center my-2'>

            <form action={toggleTodo} className='grow'>
            <Input type="hidden" name="done" value={item.done} />
            <Button  name="id" value={item.id} type="submit" variant={'ghost'} className={`${item.done === 1 ? 'line-through' : ''} w-full text-left flex-0`}>{item.todo}</Button>
            </form>
            <form action={deleteTodo}>
              <Button value={item.id} name={'id'} type="submit"><XIcon /></Button>
            </form>
          </div>

        ))}
      </div>
    </div>
  );
}

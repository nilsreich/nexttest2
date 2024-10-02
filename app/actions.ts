'use server'
import { revalidatePath } from 'next/cache';
import { db } from '../db/index'
import { todoTable } from "../db/schema";
import { eq } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server'


export async function addTodo(formData: FormData) {
    const { userId } = auth()
    const todo = formData.get('todo') as string;
    
    await db.insert(todoTable).values({ id: crypto.randomUUID(), todo, done: 0, author: userId! });
    revalidatePath('/');
}

export async function deleteTodo(formData: FormData) {
    const id = formData.get('id') as string;

    await db.delete(todoTable).where(eq(todoTable.id, id));
    revalidatePath('/');
}

export async function toggleTodo(formData: FormData) {
    const id = formData.get('id') as string;
    const done = Number(formData.get('done'));

    await db.update(todoTable).set({ done: done === 1 ? 0 : 1 }).where(eq(todoTable.id, id));
    revalidatePath('/');
}

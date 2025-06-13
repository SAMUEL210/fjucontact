'use server'

import prisma from '@/lib/prisma';
import { Tribu } from '../types';

export async function getTribus() {
  try {
    const tribus = await prisma.tribus.findMany({
        orderBy: {
            createdAt: 'desc',
        }
    });
    return tribus;
  } catch (error) {
    console.error('Error fetching tribus:', error);
    throw new Error('Failed to fetch tribus');
  }
}

export async function getTribuByName(nom: string) {
  try {
    const tribu = await prisma.tribus.findUnique({
      where: {
        nom: nom,
      }
    });
    return tribu;
  } catch (error) {
    console.error('Error fetching tribu:', error);
    throw new Error('Failed to fetch tribu');
  }
}

export async function createTribu(values:Tribu){
  try {
    const newTribu = await prisma.tribus.create({
      data: {
        nom: values.nom,
        description: values.description ? values.description : null,
      },
    });
    return newTribu;
  } catch (error) {
    console.error('Error creating tribu:', error);
    throw new Error('Failed to create tribu');
  }
}
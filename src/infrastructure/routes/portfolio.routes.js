import { Router } from 'express';

const router = Router();

router.post('/:id', ({ params }, res) => {
  const { id } = params;

  console.log(`post working ${id}`);
});

export const portfolioRoutes = router;

import React from 'react'
import { Grid } from '@mantine/core'

function GridMeals({ children }) {
  return (
    <Grid gutter="xs">
      {children}
    </Grid>
  )
}

export default GridMeals;
// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import Checkbox from '@mui/material/Checkbox'
import CardHeader from '@mui/material/CardHeader'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'

const not = (a, b) => {
  return a.filter(value => b.indexOf(value) === -1)
}

const intersection = (a, b) => {
  return a.filter(value => b.indexOf(value) !== -1)
}

const union = (a, b) => {
  return [...a, ...not(b, a)]
}

const TransferListEnhanced = () => {
  const [checked, setChecked] = useState([])
  const [left, setLeft] = useState([0, 1, 2, 3])
  const [right, setRight] = useState([4, 5, 6, 7])
  const leftChecked = intersection(checked, left)
  const rightChecked = intersection(checked, right)

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]
    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }
    setChecked(newChecked)
  }
  const numberOfChecked = items => intersection(checked, items).length

  const handleToggleAll = items => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items))
    } else {
      setChecked(union(checked, items))
    }
  }

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked))
    setLeft(not(left, leftChecked))
    setChecked(not(checked, leftChecked))
  }

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked))
    setRight(not(right, rightChecked))
    setChecked(not(checked, rightChecked))
  }

  const customList = (title, items) => (
    <Card>
      <CardHeader
        title={title}
        sx={{ px: 4, py: 2 }}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
        titleTypographyProps={{ sx: { fontSize: '1rem !important', lineHeight: '1.5 !important' } }}
        avatar={
          <Checkbox
            disabled={items.length === 0}
            onClick={handleToggleAll(items)}
            inputProps={{ 'aria-label': 'all items selected' }}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
          />
        }
      />
      <Divider sx={{ m: '0 !important' }} />
      <List role='list' component='div' sx={{ width: 200, height: 265, overflow: 'auto' }}>
        {items.map(value => {
          const labelId = `transfer-list-all-item-${value}-label`

          return (
            <ListItem key={value} role='listitem' button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  tabIndex={-1}
                  disableRipple
                  checked={checked.indexOf(value) !== -1}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`List item ${value + 1}`} />
            </ListItem>
          )
        })}
        <ListItem />
      </List>
    </Card>
  )

  return (
    <Grid container spacing={4} justifyContent='center' alignItems='center'>
      <Grid item>{customList('Choices', left)}</Grid>
      <Grid item>
        <Grid container direction='column' alignItems='center'>
          <Button
            size='small'
            sx={{ my: 1 }}
            variant='outlined'
            onClick={handleCheckedRight}
            aria-label='move selected right'
            disabled={leftChecked.length === 0}
          >
            &gt;
          </Button>
          <Button
            size='small'
            sx={{ my: 1 }}
            variant='outlined'
            onClick={handleCheckedLeft}
            aria-label='move selected left'
            disabled={rightChecked.length === 0}
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('Chosen', right)}</Grid>
    </Grid>
  )
}

export default TransferListEnhanced

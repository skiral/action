import {SORT_STEP} from 'universal/utils/constants'

export default function getNextSortOrder (arr, noise = 0) {
  const maxVal = Math.max(...arr.map((val) => val.sortOrder))
  // if it is an empty array, maxVal === -Infinity
  return Math.max(0, maxVal + SORT_STEP + noise)
}

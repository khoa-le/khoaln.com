import {
  preparePresentationData,
  sortByPresentationDate,
} from '../lib/prepare-presentation-data'

export default [
  // {
  //   title: '',
  //   resources: [],
  //   tags: [],
  //   deliveries: [
  //     {
  //       event: '',
  //       date: '',
  //       recording: '',
  //     }
  //   ],
  //   description: `
  //   `,
  // },
]
  .map(preparePresentationData)
  .sort(sortByPresentationDate)

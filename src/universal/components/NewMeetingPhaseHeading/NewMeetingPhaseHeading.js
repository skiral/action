/**
 * Renders the heading describing the current meeting phase.
 *
 * @flow
 */
import React from 'react'
import styled from 'react-emotion'

import ui from 'universal/styles/ui'
import appTheme from 'universal/styles/theme/appTheme'
import {phaseDescriptionLookup, phaseLabelLookup} from 'universal/utils/meetings/lookups'
import {createFragmentContainer} from 'react-relay'
import type {NewMeetingPhaseHeading_meeting as Meeting} from './__generated__/NewMeetingPhaseHeading_meeting.graphql'

const HeadingBlock = styled('div')({
  padding: '1rem 0'
})

const PhaseTitle = styled('h1')({
  fontFamily: appTheme.typography.serif,
  fontSize: '1.5rem',
  margin: 0
})

const PhaseDescription = styled('h2')({
  color: ui.labelHeadingColor,
  fontSize: '1rem',
  fontWeight: 'normal',
  margin: 0
})

type Props = {|
  meeting: Meeting
|}

const NewMeetingPhaseHeading = (props: Props) => {
  const {meeting} = props
  if (!meeting || !meeting.localPhase) return null
  const {
    localPhase: {phaseType}
  } = meeting
  const label = phaseLabelLookup[phaseType]
  const description = phaseDescriptionLookup[phaseType]
  if (!label || !description) return null
  return (
    <HeadingBlock>
      <PhaseTitle>{label}</PhaseTitle>
      <PhaseDescription>{description}</PhaseDescription>
    </HeadingBlock>
  )
}

export default createFragmentContainer(
  NewMeetingPhaseHeading,
  graphql`
    fragment NewMeetingPhaseHeading_meeting on NewMeeting {
      localPhase {
        phaseType
      }
    }
  `
)

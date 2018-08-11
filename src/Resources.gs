var ERROR_CODE = {
  noKey: {title: 'No Key Provided', description: 'In order to approve a swap, a valid key must be provided.', status: 1},
  noViewKey: {title: 'No Key Provided', description: 'In order to view all swaps, a valid key must be provided.', status: 1},
  invalidViewKey: {title: 'Invalid Key', description: 'The key you\'ve provided to view all swaps is invalid.', status: 1},
  invalidKey: {title: 'Invalid Key', description: 'The key you\'ve provided to approve this swap is invalid.', status: 1},
  alreadyApproved: {title: 'Swap Already Approved', description: 'You have already approved this swap.', status: 1},
  awaitRA: {title: 'Awaiting RA Approval', description: 'The swap is not yet approved by the requested RA. Please wait for them to accept before approving.', status: 1},
  awaitRD: {title: 'Awaiting RD Approval', description: 'The swap is not yet approved by the resident director. Please wait for them to approve before approving.', status: 1},
  statusErr: {title: 'Status Error', description: 'Specified status is not valid.', status: 1},
  noId: {title: 'No ID Provided', description: 'The id must not be blank.', status: 1},
  invalidId: {title: 'Invalid Swap ID', description: 'Unable to locate the swap with that given ID.', status: 1}
};

var SUCCESS_CODE = {
  raApproved: {title: 'Swap Approved!', description: 'You have successfully approved the swap. The Resident Director will be sent a link to finalize the approval.', status: 0},
  rdApproved: {title: 'Swap Approved!', description: 'You have successfully approved the swap. The SRA will be notified to update the calendar.', status: 0},
  sraApproved: {title: 'Added to Calendar', description: 'You have indicated that the calendar is updated.', status: 0}
};

var STATUS_CODE = {
  noApproval: {title: 'Not Yet Approved', description: 'The request to swap hasn\'t been approved yet. Please contact the requested RA to click the link sent to their email.', status: 0},
  raApproval: {title: 'Approved By Requested RA', description: 'The swap has been approved by the requested RA, but not yet by the Resident Director', status: 0},
  rdApproval: {title: 'Approved By Requested RA & Resident Director', description: 'The swap has been approved by the requested RA and by the Resident Director', status: 0},
  approved: {title: 'Swap Approved', description: 'The swap is approved and processed in the calendar', status: 0}
};

var EMAIL_STATUS = {
  view: 0,
  raApproval: 1,
  rdApproval: 2,
  sraApproval: 3,
  approved: 4
}

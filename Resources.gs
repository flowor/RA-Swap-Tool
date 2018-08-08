var ERROR_CODE = {
  noKey: {title: 'No Key Provided', description: 'In order to approve a swap, a valid key must be provided.'},
  invalidKey: {title: 'Invalid Key', description: 'The key you\'ve provided to approve this swap is invalid.'},
  alreadyApproved: {title: 'Swap Already Approved', description: 'You have already approved this swap.'}
};

var SUCCESS_CODE = {
  raApproved: {title: 'Swap Approved!', description: 'You have successfully approved the swap. The Resident Director will be sent a link to finalize the approval.'},
  rdApproved: {title: 'Swap Approved!', description: 'You have successfully approved the swap. The SRA will be notified to update the calendar.'},
  sraApproved: {title: 'Added to Calendar', description: 'You have indicated that the calendar is updated.'}
};

var STATUS_CODE = {
  noApproval: {title: 'Not Yet Approved', description: 'The request to swap hasn\'t been approved yet. Please contact the requested RA to click the link sent to their email.'},
  raApproval: {title: 'Approved By Requested RA', description: 'The swap has been approved by the requested RA, but not yet by the Resident Director'},
  rdApproval: {title: 'Approved By Requested RA & Resident Director', description: 'The swap has been approved by the requested RA and by the Resident Director'},
  approved: {title: 'Swap Approved', description: 'The swap is approved and processed in the calendar'},
};




function getStatusLabel(statusByte) {
  switch (statusByte) {
    case 0: return 'Idle';
    case 1: return 'Active';
    case 2: return 'Offline';
    default: return 'Unknown';
  }
}

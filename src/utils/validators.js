
export function isLocked(capsule) {
  return capsule.isLocked && new Date(capsule.unlockedDate) > new Date();
}

export function isUnlocked(capsule) {
  return capsule.isLocked && new Date(capsule.unlockedDate) <= new Date();
}

export function isDraft(capsule) {
  return !capsule.isLocked;
}

export function isOwner(capsule, userId) {
  return capsule.createdBy && capsule.createdBy._id && capsule.createdBy._id.toString() === userId;
}

export function isParticipant(capsule, userId) {
  // Check if user is the creator
  if (isOwner(capsule, userId)) {
    return true;
  }
  
  // Check if user is in the participants array
  if (capsule.participants && Array.isArray(capsule.participants)) {
    return capsule.participants.some(participant => 
      participant._id && participant._id.toString() === userId
    );
  }
  
  return false;
}
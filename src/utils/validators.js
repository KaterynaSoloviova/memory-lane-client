
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
  return capsule.createdBy._id.toString() === userId;
}
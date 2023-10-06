const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { setGlobalOptions } = require("firebase-functions/v2");
const admin = require("firebase-admin");

admin.initializeApp();

setGlobalOptions({ maxInstances: 10 });

exports.createMessage = onDocumentCreated("conversations/{conversationId}/messages/{messageId}", async (event) => {
  const snapshot = event.data;
  if (!snapshot) {
    console.log("No data associated with the event");
    return;
  }
  const messageData = snapshot.data();

  const conversationId = event.params.conversationId;
  const conversationSnapshot = await admin.firestore()
    .collection("conversations").doc(conversationId).get();
  const conversation = conversationSnapshot.data();

  if (!conversation) {
    return;
  }

  const userId = conversation.users.find((user) => user !== messageData.senderId);

  if (conversation.notified[userId]) {
    return;
  }

  const userSnapshot = await admin.firestore().collection("users").doc(userId).get();
  const user = userSnapshot.data();

  const senderSnap = await admin.firestore().collection("users").doc(messageData.senderId).get();
  const sender = senderSnap.data();

  const tokens = [...(user?.tokens || [])];
  if (!user || tokens.length === 0) {
    console.log("No FCM token for user", userId);
    return;
  }

  await admin.messaging().sendEachForMulticast({
    tokens: tokens,
    notification: {
      title: sender.name,
      body: messageData.content,
    },
  });
});

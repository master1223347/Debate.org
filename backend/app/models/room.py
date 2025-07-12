# Room model for Firestore
class Room:
    def __init__(self, room_id, format, participants, jitsi_url, status):
        self.room_id = room_id
        self.format = format
        self.participants = participants  # list of user_ids
        self.jitsi_url = jitsi_url
        self.status = status

    @staticmethod
    def from_dict(data):
        """Create a Room instance from Firestore document dict."""
        return Room(
            room_id=data.get('room_id'),
            format=data.get('format'),
            participants=data.get('participants', []),
            jitsi_url=data.get('jitsi_url'),
            status=data.get('status')
        )

    def to_dict(self):
        """Serialize Room instance to Firestore document dict."""
        return {
            'room_id': self.room_id,
            'format': self.format,
            'participants': self.participants,
            'jitsi_url': self.jitsi_url,
            'status': self.status
        }

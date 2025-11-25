const Event = require("../model/event");

const getEvents = async (req, res) => {
  const userId = req.query.userId;
  const events = await Event.find().sort({ date: 1 });

  if (!userId) return res.json({ data: events });

  const enriched = events.map((ev) => ({
    ...ev.toObject(),
    isRegistered: ev.enrolledUsers.map((id) => id.toString()).includes(userId),
  }));

  return res.json({ data: enriched });
};

const getEventById = async (req, res) => {
  const userId = req.query.userId;
  const event = await Event.findById(req.params.id);

  if (!event) return res.status(404).json({ message: "Event not found" });

  const isRegistered = userId
    ? event.enrolledUsers.map((id) => id.toString()).includes(userId)
    : false;

  return res.json({
    data: {
      ...event.toObject(),
      isRegistered,
    },
  });
};

const createEvent = async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  return res.status(201).json({ message: "Event created", data: event });
};

const registerEvent = async (req, res) => {
  const { eventId, userId } = req.body;

  if (!userId || !eventId)
    return res.status(400).json({ message: "userId & eventId required" });

  const event = await Event.findById(eventId);
  if (!event) return res.status(404).json({ message: "Event not found" });

  if (event.enrolledUsers.map((id) => id.toString()).includes(userId)) {
    return res.status(400).json({ message: "Already registered" });
  }

  event.enrolledUsers.push(userId);

  await event.save();

  res.json({ message: "Registered successfully" });
};

const myEvents = async (req, res) => {
  const userId = req.query.userId;

  if (!userId) return res.status(400).json({ message: "userId required" });

  const events = await Event.find({ enrolledUsers: userId });

  res.json({ data: events });
};

const deleteEvent = async (req, res) => {
  const id = req.params.id;

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await Event.findByIdAndDelete(id);

    return res.json({ message: "Event deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err });
  }
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  registerEvent,
  myEvents,
  deleteEvent,
};

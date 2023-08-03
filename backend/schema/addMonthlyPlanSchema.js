const mongoose = require('mongoose')

const addMonthlyPlanSchema = mongoose.Schema({
    monthlyPlanName: { type: String, required: true },
    monthlyPlanDate: { type: String, required: true },
    monthlyPlanId: { type: String, required: true },
    monthlyPlanUserId: { type: String, required: true },
    monthlyPlanStatus: { type: String, default: "NOT DONE" },
    monthlyPlanDaysTodo: { type: Array, default: []}
}) 

module.exports = mongoose.model('monthlyPlanSchema', addMonthlyPlanSchema)

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Services\RecaptchaService;
use App\Models\ContactLead;
use Illuminate\Http\Request;

class ContactLeadController extends Controller
{
    /**
     * Submit a contact form (public).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name'      => 'required|string|max:150',
            'last_name'       => 'nullable|string|max:150',
            'email'           => 'required|email|max:255',
            'message'         => 'nullable|string|max:5000',
            'recaptcha_token' => 'nullable|string',
        ]);

        // Verify reCAPTCHA
        if (!RecaptchaService::verify($request->recaptcha_token)) {
            return response()->json([
                'message' => 'reCAPTCHA verification failed. Please try again.',
            ], 422);
        }

        // Remove recaptcha_token before creating the lead
        unset($validated['recaptcha_token']);

        ContactLead::create($validated);

        return response()->json([
            'message' => 'Thank you! We will get back to you within 24 hours.',
        ], 201);
    }

    /**
     * List all leads (admin).
     */
    public function index()
    {
        return ContactLead::orderByDesc('created_at')->paginate(20);
    }

    /**
     * Update lead status (admin).
     */
    public function updateStatus(Request $request, int $id)
    {
        $lead = ContactLead::findOrFail($id);

        $request->validate([
            'status' => 'required|in:new,contacted,closed',
        ]);

        $lead->update(['status' => $request->status]);

        return response()->json(['message' => 'Status updated.']);
    }

    /**
     * Delete a lead (admin).
     */
    public function destroy(int $id)
    {
        ContactLead::findOrFail($id)->delete();
        return response()->json(['message' => 'Lead deleted.']);
    }
}

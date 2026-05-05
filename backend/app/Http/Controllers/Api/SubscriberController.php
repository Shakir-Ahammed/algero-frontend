<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SubscriberResource;
use App\Models\Subscriber;
use Illuminate\Http\Request;

class SubscriberController extends Controller
{
    /**
     * Subscribe an email (public).
     */
    public function subscribe(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|max:255',
        ]);

        // Check if already subscribed
        $existing = Subscriber::where('email', $validated['email'])->first();

        if ($existing) {
            if ($existing->is_active) {
                return response()->json([
                    'message' => 'You are already subscribed!',
                ], 200);
            }

            // Re-activate if previously unsubscribed
            $existing->update([
                'is_active'     => true,
                'subscribed_at' => now(),
            ]);

            return response()->json([
                'message' => 'Welcome back! You have been re-subscribed.',
            ], 200);
        }

        Subscriber::create([
            'email'         => $validated['email'],
            'subscribed_at' => now(),
        ]);

        return response()->json([
            'message' => 'Successfully subscribed!',
        ], 201);
    }

    /**
     * List all subscribers (admin).
     */
    public function index(Request $request)
    {
        $subscribers = Subscriber::orderByDesc('subscribed_at')
            ->paginate($request->get('per_page', 25));

        return SubscriberResource::collection($subscribers);
    }

    /**
     * Delete a subscriber (admin).
     */
    public function destroy(int $id)
    {
        $subscriber = Subscriber::findOrFail($id);
        $subscriber->delete();

        return response()->json(['message' => 'Subscriber removed.'], 200);
    }
}

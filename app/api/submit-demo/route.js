import { NextResponse } from 'next/server';
import { executeDemoRequestFlow } from '@/lib/lifie-api';

/**
 * POST /api/submit-demo
 * 
 * Server-side API route that handles demo request form submissions.
 * This route keeps the Lifie API key secure by never exposing it to the client.
 * 
 * Flow:
 * 1. Validate incoming form data
 * 2. Execute the Lifie Reach API flow (fetch preset → create batch → add lead)
 * 3. Return success/error response
 * 
 * Request body:
 * {
 *   fullName: string (required),
 *   companyName: string (required),
 *   workEmail: string (required),
 *   phoneNumber: string (required, E.164 format),
 *   teamSize?: string,
 *   useCase?: string,
 *   message?: string
 * }
 */
export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json();

    // ── Validation ──────────────────────────────────────────
    const errors = {};

    if (!body.fullName?.trim()) {
      errors.fullName = 'Full name is required';
    }

    if (!body.companyName?.trim()) {
      errors.companyName = 'Company name is required';
    }

    if (!body.workEmail?.trim()) {
      errors.workEmail = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.workEmail)) {
      errors.workEmail = 'Please enter a valid email address';
    } else {
      // Check for common personal email domains
      const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com'];
      const emailDomain = body.workEmail.split('@')[1]?.toLowerCase();
      if (personalDomains.includes(emailDomain)) {
        errors.workEmail = 'Please use your work email address';
      }
    }

    if (!body.phoneNumber?.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[1-9]\d{6,14}$/.test(body.phoneNumber.replace(/[\s\-\(\)]/g, ''))) {
      errors.phoneNumber = 'Please enter a valid phone number';
    }

    // Return validation errors if any
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, errors, message: 'Please fix the form errors' },
        { status: 400 }
      );
    }

    // ── Execute Lifie Reach API Flow ────────────────────────
    const result = await executeDemoRequestFlow({
      fullName: body.fullName.trim(),
      companyName: body.companyName.trim(),
      workEmail: body.workEmail.trim().toLowerCase(),
      phoneNumber: body.phoneNumber.replace(/[\s\-\(\)]/g, ''),
      teamSize: body.teamSize || undefined,
      useCase: body.useCase || undefined,
      message: body.message?.trim() || undefined,
    });

    return NextResponse.json({
      success: true,
      message: 'Demo request submitted successfully! You will receive a call shortly.',
      data: {
        preset: result.preset,
        campaignId: result.campaignId,
        totalRows: result.totalRows,
      },
    });

  } catch (error) {
    console.error('[Submit Demo] Error:', error.message);

    // Determine if this is a configuration error
    const isConfigError = error.message.includes('LIFIE_API_KEY') || 
                          error.message.includes('not configured');

    return NextResponse.json(
      {
        success: false,
        message: isConfigError
          ? 'Service temporarily unavailable. Please try again later.'
          : 'Something went wrong while processing your request. Please try again.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: isConfigError ? 503 : 500 }
    );
  }
}

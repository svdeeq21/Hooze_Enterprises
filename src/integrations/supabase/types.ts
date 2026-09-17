// NOTE: normally auto-generated via `supabase gen types typescript`. Hand-
// maintained here to match supabase/migrations/20260916000000_crm_foundation.sql
// because there is no live project to generate against yet. Regenerate this
// file from the real production Supabase project once migrations are applied,
// and drop this note.
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      contacts: {
        Row: {
          business_name: string | null;
          business_type: string | null;
          created_at: string;
          email: string;
          first_landing_page: string | null;
          first_referrer: string | null;
          first_touch_at: string;
          first_utm_campaign: string | null;
          first_utm_content: string | null;
          first_utm_medium: string | null;
          first_utm_source: string | null;
          id: string;
          name: string;
          phone: string | null;
          updated_at: string;
        };
        Insert: {
          business_name?: string | null;
          business_type?: string | null;
          created_at?: string;
          email: string;
          first_landing_page?: string | null;
          first_referrer?: string | null;
          first_touch_at?: string;
          first_utm_campaign?: string | null;
          first_utm_content?: string | null;
          first_utm_medium?: string | null;
          first_utm_source?: string | null;
          id?: string;
          name: string;
          phone?: string | null;
          updated_at?: string;
        };
        Update: {
          business_name?: string | null;
          business_type?: string | null;
          created_at?: string;
          email?: string;
          first_landing_page?: string | null;
          first_referrer?: string | null;
          first_touch_at?: string;
          first_utm_campaign?: string | null;
          first_utm_content?: string | null;
          first_utm_medium?: string | null;
          first_utm_source?: string | null;
          id?: string;
          name?: string;
          phone?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      consent_records: {
        Row: {
          consent_status: boolean;
          consent_text_version: string;
          consent_type: string;
          consented_at: string;
          contact_id: string;
          id: string;
          source: string;
          withdrawn_at: string | null;
        };
        Insert: {
          consent_status: boolean;
          consent_text_version: string;
          consent_type: string;
          consented_at?: string;
          contact_id: string;
          id?: string;
          source?: string;
          withdrawn_at?: string | null;
        };
        Update: {
          consent_status?: boolean;
          consent_text_version?: string;
          consent_type?: string;
          consented_at?: string;
          contact_id?: string;
          id?: string;
          source?: string;
          withdrawn_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "consent_records_contact_id_fkey";
            columns: ["contact_id"];
            isOneToOne: false;
            referencedRelation: "contacts";
            referencedColumns: ["id"];
          },
        ];
      };
      resource_requests: {
        Row: {
          business_challenge: string | null;
          contact_id: string;
          created_at: string;
          delivered_at: string | null;
          delivery_status: string;
          id: string;
          landing_page: string | null;
          referrer: string | null;
          request_fingerprint: string;
          resource_slug: string;
          source: string;
          utm_campaign: string | null;
          utm_content: string | null;
          utm_medium: string | null;
          utm_source: string | null;
        };
        Insert: {
          business_challenge?: string | null;
          contact_id: string;
          created_at?: string;
          delivered_at?: string | null;
          delivery_status?: string;
          id?: string;
          landing_page?: string | null;
          referrer?: string | null;
          request_fingerprint: string;
          resource_slug?: string;
          source?: string;
          utm_campaign?: string | null;
          utm_content?: string | null;
          utm_medium?: string | null;
          utm_source?: string | null;
        };
        Update: {
          business_challenge?: string | null;
          contact_id?: string;
          created_at?: string;
          delivered_at?: string | null;
          delivery_status?: string;
          id?: string;
          landing_page?: string | null;
          referrer?: string | null;
          request_fingerprint?: string;
          resource_slug?: string;
          source?: string;
          utm_campaign?: string | null;
          utm_content?: string | null;
          utm_medium?: string | null;
          utm_source?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "resource_requests_contact_id_fkey";
            columns: ["contact_id"];
            isOneToOne: false;
            referencedRelation: "contacts";
            referencedColumns: ["id"];
          },
        ];
      };
      email_deliveries: {
        Row: {
          attempt_count: number;
          created_at: string;
          email_type: string;
          error_message: string | null;
          id: string;
          provider_message_id: string | null;
          recipient: string;
          related_id: string;
          related_table: string;
          status: string;
          updated_at: string;
        };
        Insert: {
          attempt_count?: number;
          created_at?: string;
          email_type: string;
          error_message?: string | null;
          id?: string;
          provider_message_id?: string | null;
          recipient: string;
          related_id: string;
          related_table: string;
          status?: string;
          updated_at?: string;
        };
        Update: {
          attempt_count?: number;
          created_at?: string;
          email_type?: string;
          error_message?: string | null;
          id?: string;
          provider_message_id?: string | null;
          recipient?: string;
          related_id?: string;
          related_table?: string;
          status?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      enquiry_notes: {
        Row: {
          author_email: string;
          created_at: string;
          enquiry_id: string;
          id: string;
          note: string;
        };
        Insert: {
          author_email: string;
          created_at?: string;
          enquiry_id: string;
          id?: string;
          note: string;
        };
        Update: {
          author_email?: string;
          created_at?: string;
          enquiry_id?: string;
          id?: string;
          note?: string;
        };
        Relationships: [
          {
            foreignKeyName: "enquiry_notes_enquiry_id_fkey";
            columns: ["enquiry_id"];
            isOneToOne: false;
            referencedRelation: "project_enquiries";
            referencedColumns: ["id"];
          },
        ];
      };
      site_events: {
        Row: {
          created_at: string;
          event_type: string;
          id: string;
          landing_page: string | null;
          metadata: Json | null;
          referrer: string | null;
          session_id: string;
          utm_campaign: string | null;
          utm_content: string | null;
          utm_medium: string | null;
          utm_source: string | null;
        };
        Insert: {
          created_at?: string;
          event_type: string;
          id?: string;
          landing_page?: string | null;
          metadata?: Json | null;
          referrer?: string | null;
          session_id: string;
          utm_campaign?: string | null;
          utm_content?: string | null;
          utm_medium?: string | null;
          utm_source?: string | null;
        };
        Update: {
          created_at?: string;
          event_type?: string;
          id?: string;
          landing_page?: string | null;
          metadata?: Json | null;
          referrer?: string | null;
          session_id?: string;
          utm_campaign?: string | null;
          utm_content?: string | null;
          utm_medium?: string | null;
          utm_source?: string | null;
        };
        Relationships: [];
      };
      project_enquiries: {
        Row: {
          budget_range: string | null;
          business_name: string;
          consent: boolean;
          contact_id: string | null;
          created_at: string;
          current_tools: string | null;
          email: string;
          id: string;
          landing_page: string | null;
          name: string;
          preferred_contact: string;
          problem: string;
          project_type: string;
          referrer: string | null;
          request_fingerprint: string;
          source: string;
          status: string;
          timeline: string | null;
          updated_at: string;
          utm_campaign: string | null;
          utm_content: string | null;
          utm_medium: string | null;
          utm_source: string | null;
          whatsapp: string | null;
        };
        Insert: {
          budget_range?: string | null;
          business_name: string;
          consent: boolean;
          contact_id?: string | null;
          created_at?: string;
          current_tools?: string | null;
          email: string;
          id?: string;
          landing_page?: string | null;
          name: string;
          preferred_contact?: string;
          problem: string;
          project_type: string;
          referrer?: string | null;
          request_fingerprint: string;
          source?: string;
          status?: string;
          timeline?: string | null;
          updated_at?: string;
          utm_campaign?: string | null;
          utm_content?: string | null;
          utm_medium?: string | null;
          utm_source?: string | null;
          whatsapp?: string | null;
        };
        Update: {
          budget_range?: string | null;
          business_name?: string;
          consent?: boolean;
          contact_id?: string | null;
          created_at?: string;
          current_tools?: string | null;
          email?: string;
          id?: string;
          landing_page?: string | null;
          name?: string;
          preferred_contact?: string;
          problem?: string;
          project_type?: string;
          referrer?: string | null;
          request_fingerprint?: string;
          source?: string;
          status?: string;
          timeline?: string | null;
          updated_at?: string;
          utm_campaign?: string | null;
          utm_content?: string | null;
          utm_medium?: string | null;
          utm_source?: string | null;
          whatsapp?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "project_enquiries_contact_id_fkey";
            columns: ["contact_id"];
            isOneToOne: false;
            referencedRelation: "contacts";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    keyof DefaultSchema["CompositeTypes"] | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;

<x-app-layout>
  <x-slot name="header">
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">
          {{ __('HEHEHE') }}
      </h2>
  </x-slot>

  <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div class="p-6 bg-white border-b border-gray-200">
                  You're in the pegawai dashboard, {{$user->name}}!
              </div>
          </div>
      </div>
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <x-form>
            <x-form-input name="last_name" label="Last Name" />
    
            <!-- \Spatie\Translatable\HasTranslations -->
            <x-form-textarea name="biography" language="nl" placeholder="Dutch Biography" />
            <x-form-textarea name="biography" language="en" placeholder="English Biography" />
    
            <!-- Inline radio inputs -->
            <x-form-group name="newsletter_frequency" label="Newsletter frequency" inline>
                <x-form-radio name="newsletter_frequency" value="daily" label="Daily" />
                <x-form-radio name="newsletter_frequency" value="weekly" label="Weekly" />
            </x-form-group>
    
            <x-form-group>
                <x-form-checkbox name="subscribe_to_newsletter" label="Subscribe to newsletter" />
                <x-form-checkbox name="agree_terms" label="Agree with terms" />
            </x-form-group>
    
            <x-form-submit />
        </x-form>
      </div>
  </div>
</x-app-layout>
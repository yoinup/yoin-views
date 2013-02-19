
module Yoin

  class HandlebarsPrecompiler < Rake::Pipeline::Filter
    class << self
      def context

        unless @context

        contents = <<END

#{File.read("#{Yoin.submodule_path}ember.js/packages/handlebars/lib/main.js")}
#{File.read("#{Yoin.submodule_path}yoin-ember/vendor/precompile/ember-runtime.js")}
#{File.read("#{Yoin.submodule_path}ember.js/packages/ember-handlebars-compiler/lib/main.js")}
function precompileEmberHandlebars(string) {
  return Ember.Handlebars.precompile(string).toString();
}
END

          @context = ExecJS.compile(contents)

        end
        @context
      end

    end

    def precompile_templates(name, data)
     "\nEmber.TEMPLATES['#{name}'] = Ember.Handlebars.template(#{self.class.context.call("precompileEmberHandlebars", data)});\n"
    end

    def generate_output(inputs, output)

      inputs.each do |input|

        name = File.basename(input.path, '.handlebars')
        data = File.read(input.fullpath)
        result = precompile_templates(name, data)
        output.write result

      end
    end

  end

end

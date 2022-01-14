using Microsoft.AspNetCore.Mvc;
using MediatR;

namespace API.Controllers;

[Route("api/[controller]")]
public abstract class BaseApiController : ControllerBase
{
    private IMediator _mediator;

    /*
    Summary:
    Available in C# 8.0 and later, the null-coalescing assignment operator ??= assigns the value of its right-hand operand to its left-hand operand only if the left-hand operand evaluates to null. The ??= operator doesn't evaluate its right-hand operand if the left-hand operand evaluates to non-null.
    */
    //??= null coalescing (If available use _mediator, then if null assign to the propperty of Mediater and use HttpContext)
   protected IMediator Mediator => _mediator ??= HttpContext.RequestServices
    .GetService<IMediator>();
}
